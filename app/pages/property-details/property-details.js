import {OnInit} from '@angular/core';
import {Page, NavController, NavParams, Alert, ActionSheet} from 'ionic-angular';
import {BrokerDetailsPage} from '../broker-details/broker-details';
import {PropertyService} from '../../services/property-service';
import { SocialSharing } from '@ionic-native/social-sharing';


@Page({
    templateUrl: 'build/pages/property-details/property-details.html'
})
export class PropertyDetailsPage {

    static get parameters() {
        return [[NavController], [NavParams], [PropertyService]];
    }

    constructor(nav, navParams, propertyService, socialSharing) {
        this.nav = nav;
        this.propertyService = propertyService;
        this.property = navParams.get('property');
        this.socialSharing = SocialSharing
    }

    ngOnInit() {
        this.propertyService.findById(this.property.id).subscribe(property => this.property = property);
    }

    favorite(event, property) {

        this.propertyService.favorite(property).subscribe(() => {
            let alert = Alert.create({
                title: 'Favorites',
                subTitle: 'Property added to your favorites',
                buttons: ['OK']
            });
            this.nav.present(alert);
        });

    }

    like(event, property) {
        // Simulated in this sample. See "Favorite" for similar functionality.
        this.property.likes++;
    }

    share(event, property) {
        let actionSheet = ActionSheet.create({
            buttons: [
                {
                    text: 'Text',
                    handler: () => {
                        console.log(window.location.href);
                    }
                },
                {
                    text: 'Email',
                    handler: () => {
                        console.log(window.location.href);
                        this.socialSharing.shareViaEmail('Body', 'Subject', 'recipient@example.org').then(() => {
                        // Success!
                        }).catch(() => {
                        // Error!
                        });
                    }
                },
                {
                    text: 'Facebook',
                    handler: () => {
                        console.log(window.location.href);
                        this.socialSharing.shareViaFacebook('message', image, url).then(() => {
                        // Success!
                        }).catch(() => {
                        // Error!
                        });
                    }
                },
                {
                    text: 'Twitter',
                    handler: () => {
                        console.log(window.location.href);
                        this.socialSharing.shareViaTwitter('message', image, url).then(() => {
                        // Success!
                        }).catch(() => {
                        // Error!
                        });
                    }
                },
                {
                    text: 'Whatsapp',
                    handler: () => {
                        console.log(window.location.href);
                        this.socialSharing.shareViaWhatsapp('message', image, url).then(() => {
                        // Success!
                        }).catch(() => {
                        // Error!
                        });
                    }
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        this.nav.present(actionSheet);
    }

    showBroker(event, broker) {
        this.nav.push(BrokerDetailsPage, {
            broker: broker
        });
    }

}