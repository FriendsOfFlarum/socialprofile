import app from 'flarum/app';
import { extend } from 'flarum/extend';
import UserCard from 'flarum/components/UserCard';
import Badge from 'flarum/components/Badge';
import SocialButtonsModal from 'Davis/SocialProfile/components/SocialButtonsModal';

app.initializers.add('davis-socialprofile-forum', function() {

    extend(UserCard.prototype, 'init', function() {
    
      var user = this.props.user;
      var apiUrl = app.forum.attribute('apiUrl') + '/profile/socialbutton/' + user.data.id;
      this.buttonsArray = null; //Indicate we haven't retrieved the user's buttons
      //Get buttons from database
      app.request({method: "GET", url: apiUrl}).then(result => {
        //Test if user has set their buttons up already
        if(result.data.attributes.hasOwnProperty("buttons")) {
            //Test if buttons have been set up, but the array is empty
            if (result.data.attributes.buttons == "[]") {
                //Since there are no buttons set, we have a blank slate
                this.buttonsArray = true; //Indicate we have retrieved the user's buttons
                this.isBlankSlate = true; //Indicate we don't have any buttons
            } else {
                //The buttons array must not be empty, so lets set it
                this.buttonsArray = JSON.parse(result.data.attributes.buttons);
                this.isBlankSlate = false; //Indicate we do have buttons
            }
        } else {
            //This user has never set their buttons
            this.buttonsArray = true; //Indicate we have retrieved the user's buttons
            this.isBlankSlate = true; //Indicate we don't have any buttons
        }
        user.freshness = new Date(); //Tell Mithril we have new data
        m.redraw(); //Refresh the DOM
      });
      
      //If the buttons have been edited, we need to refresh them
        $('#app').on('refreshSocialButtons', (e, buttons)=>{
            var user = this.props.user; //Then is our user
            this.buttonsArray = JSON.parse(buttons); //Parse the saved array from editing
            this.isBlankSlate = false; //Indicate we do really have buttons
            user.freshness = new Date(); //Tell Mithril we have new data
            m.redraw(); //Refresh DOM
        });
    });
    
    extend(UserCard.prototype, 'infoItems', function(items) {
        
        // If request hasn't loaded yet, don't add any items.
        if (!this.buttonsArray) return;
        
        //If there are buttons, add them
        if (!this.isBlankSlate) {
            //Loop through the buttonsArray
            for (const k in this.buttonsArray) {
                const selectedButton = this.buttonsArray[k]; //Set constant for easier selection
                //Ensure the button has a title, icon, and url
                if (selectedButton["title"] !== "" && selectedButton["icon"] !== "" && selectedButton["url"] !== "") {
                    //If the button is using a favicon, make sure it is displayed
                    if (selectedButton['favicon'] !== 'none') {
                        var buttonStyle = 'background-image: url("'+selectedButton['favicon']+'");background-size: 60%;background-position: 50% 50%;background-repeat: no-repeat;';
                        //If the favicon is set to greyscale, make sure it is displayed
                        if (/social-favicon-grey-\d/.test(selectedButton['icon'])) {
                            var buttonClass = selectedButton["icon"] + '-' + k + ' social-button social-greyscale-button';
                        } else {
                            var buttonClass = selectedButton["icon"] + '-' + k + ' social-button';
                        }
                    } else {
                        var buttonsStyle = '';
                        var buttonClass = selectedButton["icon"] + '-' + k + ' social-button';
                    }
                    //Acctually add the button
                    items.add(buttonClass , Badge.component({
                        type: "social social-icon-" + k,
                        icon: selectedButton["icon"],
                        label: selectedButton["title"],
                        style: buttonStyle,
                        onclick: function() {
                            window.open(selectedButton["url"],'_blank');
                        }
                    }));
                }
            }
            //Add the edit buttons at the end, as long as it's their own profile
            if (app.session.user === app.current.user) {
                //Add the settings button
                items.add('settings social-button', Badge.component({
                    type: "social social-settings",
                    icon: 'cog',
                    label: app.translator.trans('davis-socialprofile.forum.edit.edit'),
                    onclick: () => {
                        app.modal.show(new SocialButtonsModal()); //Show the edit modal
                    }
                }), -1);
            }
        //It turns out they don't have any buttons
        } else {
            //Add an add button only if its their own profile
            if (app.session.user === app.current.user) {
                //Add the add button
                items.add('settings social-button', Badge.component({
                    type: "social null-social-settings",
                    icon: "plus",
                    label: app.translator.trans('davis-socialprofile.forum.edit.add'),
                    onclick: () => {
                        app.modal.show(new SocialButtonsModal())
                    }
                }), -1);
            }
        }
    });
});