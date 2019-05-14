import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
// import { escape } from '@microsoft/sp-lodash-subset';

// import styles from './HelloWorldWebPart.module.scss';
import * as strings from 'HelloWorldWebPartStrings';

// polyfill for ES5 code as doesn't include native implementation for customElements
import '@webcomponents/custom-elements/src/native-shim';
// polyfill for browsers that don't support shadowDom & customElements (IE & Edge)
import '@webcomponents/webcomponentsjs/bundles/webcomponents-sd-ce';
// angular elements application
import './app/ngElementsHelloWorld';

export interface IHelloWorldWebPartProps {
  description: string;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {

  public render(): void {
    // this.domElement.innerHTML = `<app-root [isOnline]='false'></app-root>`;
    console.log('this.DOMELEMENT1', this.domElement);
    this.domElement.innerHTML = `<app-to-delete1></app-to-delete1>`;
    console.log('this.domElement2', this.domElement);

    // const element = this.domElement.getElementsByTagName('summary-list-trackers')[0];
    // element.addEventListener('elementButtonClick', (event: any) => {
    //   alert(event.detail);
    // });
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
