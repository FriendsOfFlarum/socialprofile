import FormModal, { IFormModalAttrs } from 'flarum/common/components/FormModal';
import User from 'flarum/common/models/User';
import type Mithril from 'mithril';
import type { SocialButton } from '../extend';
export interface DeleteButtonModalAttrs extends IFormModalAttrs {
    user: User;
    index: number;
}
export default class DeleteButtonModal extends FormModal<DeleteButtonModalAttrs> {
    private buttons;
    private index;
    private button;
    oninit(vnode: Mithril.Vnode<DeleteButtonModalAttrs>): void;
    className(): string;
    title(): Mithril.Children;
    content(): Mithril.Children;
    data(): {
        socialButtons: string;
    };
    onsubmit(e: Event): void;
    createButtonObject(key: number, button?: SocialButton | null): void;
}
