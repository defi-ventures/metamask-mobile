import React, { PureComponent } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	Image,
	Text,
	InteractionManager,
	View,
	ScrollView,
	TouchableOpacity,
	Linking
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { colors, fontStyles } from '../../../../styles/common';
import PropTypes from 'prop-types';
import { strings } from '../../../../../locales/i18n';
import { getNavigationOptionsTitle } from '../../../UI/Navbar';

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: colors.white,
		flex: 1
	},
	wrapperContent: {
		paddingLeft: 24,
		paddingRight: 24,
		paddingVertical: 24
	},
	title: {
		fontSize: 18,
		textAlign: 'left',
		marginBottom: 20,
		...fontStyles.normal
	},
	link: {
		fontSize: 18,
		textAlign: 'left',
		marginBottom: 20,
		...fontStyles.normal,
		color: colors.blue
	},
	division: {
		borderBottomColor: colors.grey400,
		borderBottomWidth: 1,
		width: '30%',
		marginBottom: 20
	},
	image: {
		width: 100,
		height: 100
	},
	logoWrapper: {
		flex: 1,
		backgroundColor: colors.white,
		alignItems: 'center',
		justifyContent: 'center',
		top: 20,
		marginBottom: 40
	},
	versionInfo: {
		marginTop: 20,
		fontSize: 18,
		textAlign: 'left',
		marginBottom: 20,
		color: colors.fontSecondary,
		...fontStyles.normal
	}
});

const foxImage = require('../../../../images/fox.png'); // eslint-disable-line import/no-commonjs

/**
 * View that contains app information
 */
export default class AppInformation extends PureComponent {
	static navigationOptions = ({ navigation }) =>
		getNavigationOptionsTitle(strings('app_settings.info_title'), navigation);

	static propTypes = {
		/**
		/* navigation object required to push new views
		*/
		navigation: PropTypes.object
	};

	goTo = (url, title) => {
		InteractionManager.runAfterInteractions(() => {
			this.props.navigation.navigate('Webview', {
				url,
				title
			});
		});
	};

	onPrivacyPolicy = () => {
		const url = 'https://metamask.io/privacy.html';
		this.goTo(url, strings('app_information.privacy_policy'));
	};

	onTermsOfUse = () => {
		const url = 'https://metamask.io/terms.html';
		this.goTo(url, strings('app_information.terms_of_use'));
	};

	onAttributions = () => {
		const url = 'https://metamask.io/attributions.html';
		this.goTo(url, strings('app_information.attributions'));
	};

	onSupportCenter = () => {
		const url = 'https://metamask.zendesk.com/hc/en-us';
		this.goTo(url, strings('drawer.metamask_support'));
	};

	onWebSite = () => {
		const url = 'https://metamask.io/';
		this.goTo(url, 'metamask.io');
	};

	onEmailUs = () => {
		this.props.navigation.pop();
		Linking.openURL('mailto:help@metamask.io?subject=Feedback');
	};

	getAppInfo = () => {
		const appName = DeviceInfo.getApplicationName();
		const appVersion = DeviceInfo.getVersion();
		const buildNumber = DeviceInfo.getBuildNumber();

		return `${appName} v${appVersion} (${buildNumber})`;
	};

	render = () => (
		<SafeAreaView style={styles.wrapper} testID={'app-settings-screen'}>
			<ScrollView contentContainerStyle={styles.wrapperContent}>
				<View style={styles.logoWrapper}>
					<Image source={foxImage} style={styles.image} resizeMethod={'auto'} />
					<Text style={styles.versionInfo}>{this.getAppInfo()}</Text>
				</View>
				<Text style={styles.title}>{strings('app_information.links')}</Text>
				<View style={styles.links}>
					<TouchableOpacity onPress={this.onPrivacyPolicy}>
						<Text style={styles.link}>{strings('app_information.privacy_policy')}</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.onTermsOfUse}>
						<Text style={styles.link}>{strings('app_information.terms_of_use')}</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.onAttributions}>
						<Text style={styles.link}>{strings('app_information.attributions')}</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.division} />
				<View style={styles.links}>
					<TouchableOpacity onPress={this.onSupportCenter}>
						<Text style={styles.link}>{strings('app_information.support_center')}</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.onWebSite}>
						<Text style={styles.link}>{strings('app_information.web_site')}</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.onEmailUs}>
						<Text style={styles.link}>{strings('app_information.email_us')}</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
