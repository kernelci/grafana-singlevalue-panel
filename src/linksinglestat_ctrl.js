import { MetricsPanelCtrl } from 'app/plugins/sdk';
import { PanelEvents } from '@grafana/data';

class LinkSingleStatCtrl extends MetricsPanelCtrl {
    constructor($scope, $injector) {
        super($scope, $injector);

        const panelDefaults = {
            textTemplate: 'Please insert name',
            urlTemplate: 'http://example.com',
            valueFontSize: '80%',
        };

        for (let prop in panelDefaults) {
            if (!(prop in this.panel)) {
                this.panel[prop] = panelDefaults[prop];
            }
        }

        this.events.on(PanelEvents.editModeInitialized, this.onInitEditMode.bind(this));
        this.events.on(PanelEvents.dataReceived, this.onDataReceived.bind(this));
        this.events.on(PanelEvents.panelSizeChanged, this.adjustFontSize.bind(this));
        this.events.on(PanelEvents.panelInitialized, this.adjustFontSize.bind(this));
    }

    onInitEditMode() {
        this.fontSizes = ['20%', '30%', '50%', '70%', '80%', '100%', '110%', '120%', '150%', '170%', '200%'];
        this.addEditorTab('Options', 'public/plugins/grafana-linksinglestat-panel/editor.html');
    }

    onDataReceived(dataList) {
        if (!dataList.length) {
            return;
        }

        const results = dataList[0];
        const data = results.rows && results.rows[0];

        // Imitate the "templating" syntax of the table panel plugin
        this.text = this.panel.textTemplate.replace(
            /\${__cell_(\d+)}/g,
            (match, cellNumber) => (
                data[cellNumber]
            )
        );
        this.url = this.panel.urlTemplate.replace(
            /\${__cell_(\d+)}/g,
            (match, cellNumber) => (
                data[cellNumber]
            )
        );
    }

    adjustFontSize() {
        const elem = document.getElementsByClassName("singlestat-panel")[0].parentNode;
        const boundingRectangle = elem.getBoundingClientRect();
        const width = boundingRectangle.width;
        const height = boundingRectangle.height;
        // Allow to use a bit more space for wide gauges
        const dimension = Math.min(width, height * 1.3);
        const fontScale = parseInt(this.panel.valueFontSize, 10) / 100;
        this.fontSize = Math.min(dimension / 5, 100) * fontScale;
    }
}

LinkSingleStatCtrl.templateUrl = 'module.html';

export { LinkSingleStatCtrl };
