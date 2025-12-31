import FormModal, { IFormModalAttrs } from 'flarum/common/components/FormModal';
import User from 'flarum/common/models/User';
import type Mithril from 'mithril';
import type { SocialButton } from '../extend';
export interface SocialButtonsModalAttrs extends IFormModalAttrs {
    user: User;
}
export default class SocialButtonsModal extends FormModal<SocialButtonsModalAttrs> {
    private buttons;
    oninit(vnode: Mithril.Vnode<SocialButtonsModalAttrs>): void;
    className(): string;
    title(): Mithril.Children;
    content(): Mithril.Children;
    data(): {
        socialButtons: string;
    };
    onsubmit(e: Event): void;
    addSocialButton(): void;
    delSocialButton(): void;
    createButtonObject(key: number, button?: SocialButton | null): void;
}
