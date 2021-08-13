import app from 'flarum/admin/app';

app.initializers.add('fof-socialprfile', () => {
    app.extensionData
        .for('fof-socialprofile')
        .registerSetting({
            setting: 'fof-socialprofile.allow_external_favicons',
            type: 'switch',
            label: app.translator.trans('fof-socialprofile.admin.settings.allow_external_favicons_label'),
        })
        .registerPermission(
            {
                icon: 'fas fa-globe',
                label: app.translator.trans('fof-socialprofile.admin.permissions.view'),
                permission: 'fof-socialprofile.view',
                allowGuest: true,
            },
            'view'
        )
        .registerPermission(
            {
                icon: 'fas fa-globe',
                label: app.translator.trans('fof-socialprofile.admin.permissions.editOwn'),
                permission: 'fof-socialprofile.editOwn',
            },
            'start'
        )
        .registerPermission(
            {
                icon: 'fas fa-globe',
                label: app.translator.trans('fof-socialprofile.admin.permissions.editAny'),
                permission: 'fof-socialprofile.editAny',
            },
            'moderate'
        );
});
