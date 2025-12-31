import app from 'flarum/admin/app';
import Extend from 'flarum/common/extenders';

export default [
  new Extend.Admin() //
    .setting(() => ({
      setting: 'fof-socialprofile.allow_external_favicons',
      type: 'switch',
      label: app.translator.trans('fof-socialprofile.admin.settings.allow_external_favicons_label'),
    }))
    .setting(() => ({
      setting: 'fof-socialprofile.favicon_provider',
      type: 'dropdown',
      label: app.translator.trans('fof-socialprofile.admin.settings.favicon_provider_label'),
      options: {
        google: 'Google',
        duckduckgo: 'DuckDuckGo',
        yandex: 'Yandex',
      },
    }))
    .permission(
      () => ({
        icon: 'fas fa-globe',
        label: app.translator.trans('fof-socialprofile.admin.permissions.view'),
        permission: 'fof-socialprofile.view',
        allowGuest: true,
      }),
      'view'
    )
    .permission(
      () => ({
        icon: 'fas fa-globe',
        label: app.translator.trans('fof-socialprofile.admin.permissions.editOwn'),
        permission: 'fof-socialprofile.editOwn',
      }),
      'start'
    )
    .permission(
      () => ({
        icon: 'fas fa-globe',
        label: app.translator.trans('fof-socialprofile.admin.permissions.editAny'),
        permission: 'fof-socialprofile.editAny',
      }),
      'moderate'
    ),
];
