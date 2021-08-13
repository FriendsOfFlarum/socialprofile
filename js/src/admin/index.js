import app from 'flarum/admin/app';

app.initializers.add('fof-socialprfile', () => {
    app.extensionData.for('fof-socialprofile').registerSetting({
        setting: 'fof-socialprofile.allow_external_favicons',
        type: 'switch',
        label: app.translator.trans('fof-socialprofile.admin.settings.allow_external_favicons_label'),
    });
});
