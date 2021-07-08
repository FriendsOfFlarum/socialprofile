import app from 'flarum/admin/app';

app.initializers.add('fof-socialprofile', () => {
    app.extensionData
        .for('fof-socialprofile')
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
