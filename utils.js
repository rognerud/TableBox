define(["qlik"],function(qlik) {
  return {
      getMasterObjectList: function getMasterObjectList() {
        var self = this;
        var app = qlik.currApp(this);
        return new Promise(function (resolve, reject) {
          app.getList('masterobject').then(function (model) {
            app.destroySessionObject(model.layout.qInfo.qId);
            var supportedMasterItems = model.layout.qAppObjectList.qItems;
  
            if (!model.layout.qAppObjectList.qItems) return resolve({
              value: '',
              label: 'No MasterObjects'
          });

            return resolve(supportedMasterItems.map(function (item) {
              return {
                value: item.qInfo.qId,
                label: item.qMeta.title,
              };
            }));
          });
        });
      }
    };
  })