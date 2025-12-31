import Dropdown, { IDropdownAttrs } from 'flarum/common/components/Dropdown';
import ItemList from 'flarum/common/utils/ItemList';
import Stream from 'flarum/common/utils/Stream';
import Mithril from 'mithril';
export interface IconSelectorAttrs extends IDropdownAttrs {
    selection: Stream<string>;
    favicon: Stream<string>;
    url: Stream<string>;
    index: Stream<number>;
    allowsExternal: boolean;
}
export default class IconSelectorComponent extends Dropdown<IconSelectorAttrs> {
    private icons;
    private faviconUrl;
    static initAttrs(attrs: IconSelectorAttrs): void;
    oninit(vnode: Mithril.Vnode<IconSelectorAttrs>): void;
    view(vnode: Mithril.Vnode<IconSelectorAttrs>): JSX.Element;
    getButtonContent(): (string | JSX.Element | JSX.Element[])[];
    items(): ItemList<Mithril.Children>;
    select(icon: string): void;
}
