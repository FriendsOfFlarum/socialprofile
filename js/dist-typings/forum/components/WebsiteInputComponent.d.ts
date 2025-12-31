import Component, { ComponentAttrs } from 'flarum/common/Component';
import Stream from 'flarum/common/utils/Stream';
import Mithril from 'mithril';
export interface ButtonData {
    index: Stream<number>;
    favicon: Stream<string>;
    title: Stream<string>;
    url: Stream<string>;
    icon: Stream<string>;
}
export interface WebsiteInputAttrs extends ComponentAttrs {
    button: ButtonData;
}
export default class WebsiteInputComponent extends Component<WebsiteInputAttrs> {
    private button;
    private allowsExternal;
    private waitUntilFinished?;
    oninit(vnode: Mithril.Vnode<WebsiteInputAttrs>): void;
    view(vnode: Mithril.Vnode<WebsiteInputAttrs>): JSX.Element;
    onUrlChange(value: string): void;
}
