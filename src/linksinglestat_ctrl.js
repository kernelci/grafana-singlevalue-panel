import { MetricsPanelCtrl } from 'app/plugins/sdk';
import { PanelEvents } from '@grafana/data';

class LinkSingleStatCtrl extends MetricsPanelCtrl {
    constructor($scope, $injector) {
        super($scope, $injector);
        this.events.on(PanelEvents.dataReceived, this.onDataReceived.bind(this));
    }

    onDataReceived(dataList) {
        if (!dataList.length) {
            return;
        }

        const results = dataList[0];
        const data = results.rows[0];
        this.text = data[12];
        this.url = data[13];
        // this.seriesJson = JSON.stringify(this.series);
        // this.dataListJson = JSON.stringify(dataList);
    }
}

LinkSingleStatCtrl.templateUrl = 'module.html';

export { LinkSingleStatCtrl };
