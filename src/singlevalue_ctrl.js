import { MetricsPanelCtrl } from 'app/plugins/sdk';
import { PanelEvents } from '@grafana/data';

class SingleValueCtrl extends MetricsPanelCtrl {
    constructor($scope, $injector, templateSrv) {
        super($scope, $injector);

        const panelDefaults = {
            textTemplate: '',
            urlTemplate: '',
            valueFontSize: '80%',
        };

        for (let prop in panelDefaults) {
            if (!(prop in this.panel)) {
                this.panel[prop] = panelDefaults[prop];
            }
        }

        this.templateSrv = templateSrv;
        this.events.on(PanelEvents.panelInitialized, this.adjustFontSize.bind(this));
        this.events.on(PanelEvents.editModeInitialized, this.onInitEditMode.bind(this));
        this.events.on(PanelEvents.dataReceived, this.onDataReceived.bind(this));
    }

    onInitEditMode() {
        this.fontSizes = ['20%', '30%', '50%', '70%', '80%', '100%', '110%', '120%', '150%', '170%', '200%'];
        this.addEditorTab('Options', 'public/plugins/grafana-singlevalue-panel/editor.html');
    }

    onDataReceived(dataList) {
        if (!dataList.length) {
            return;
        }

        const results = dataList[0];
        const data = results && results.rows && results.rows[0];
        if (!data) {
            this.text = "No result rows. Make sure you are using 'Table' format and not 'Time series' format.";
            this.url = null;
            return;
        }

        // Substitute variables in the two templates
        const vars = {};
        for (let key in data) {
            let value = data[key];
            vars["__cell_" + key] = { value: value, text: value ? value.toString() : '' };
        }
        this.text = this.templateSrv.replace(this.panel.textTemplate, vars);
        this.url = this.templateSrv.replace(this.panel.urlTemplate, vars, encodeURIComponent);
    }

    render() {
        this.adjustFontSize();
    }

    adjustFontSize() {
        const BASE_FONT_SIZE = 38;
        this.fontPixelSize = (parseInt(this.panel.valueFontSize, 10) / 100) * BASE_FONT_SIZE;
    }
}

SingleValueCtrl.templateUrl = 'module.html';

export { SingleValueCtrl };
