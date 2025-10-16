import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import ScanbotSDK from 'scanbot-web-sdk';
import { UIConfig } from 'scanbot-web-sdk/@types';

@Injectable({providedIn: 'root'})
export class ScanbotSDKService {
    private sdk!: ScanbotSDK;

    private async initSdk(): Promise<any> {
        if (this.sdk) return this.sdk;
        this.sdk = await ScanbotSDK.initialize({
            licenseKey:  environment.scanbotSdkLicenseKey,
            enginePath: '/wasm/',
        });
        console.log('Scanbot SDK initialized (singleton)');
        return this.sdk;
    }

    /**
     * Check SDK lisence validity
     * @returns {Promise<boolean>}
     */
    public async checkLicense(): Promise<boolean> {
        const sdk = await this.initSdk();
        const licenseInfo = await sdk.getLicenseInfo();
        console.log("Lisence : ", licenseInfo);
        return licenseInfo.isValid();
    }

    /**
     * Signal scan with confirmation dialog
     * @param
     * @returns {void}
     */
    private setSignalScanUseCase(config: UIConfig.BarcodeScannerScreenConfiguration): void {
        const useCase = new UIConfig.SingleScanningMode();
        useCase.confirmationSheetEnabled = true;
        useCase.sheetColor = "#FFFFFF";
        // Hide/unhide the barcode image.
        useCase.barcodeImageVisible = true;
        // Configure the barcode title of the confirmation sheet.
        useCase.barcodeTitle.visible = true;
        useCase.barcodeTitle.color = "#000000";
        // Configure the barcode subtitle of the confirmation sheet.
        useCase.barcodeSubtitle.visible = true;
        useCase.barcodeSubtitle.color = "#000000";
        // Configure the cancel button of the confirmation sheet.
        useCase.cancelButton.text = "Annuler";
        useCase.cancelButton.foreground.color = "#C8193C";
        useCase.cancelButton.background.fillColor = "#FFFFFF30";
        // Configure the submit button of the confirmation sheet.
        useCase.submitButton.text = "Confirmer";
        useCase.submitButton.foreground.color = "#FFFFFF";
        useCase.submitButton.background.fillColor = "#C8193C";
        config.useCase = useCase;
    }

    /**
     * Set palette configuration
     * @param config 
     */
    private setPaletteConfig(config: UIConfig.BarcodeScannerScreenConfiguration) {
        config.palette.sbColorPrimary = "#C8193C";
        config.palette.sbColorPrimaryDisabled = "#F5F5F5";
        config.palette.sbColorNegative = "#FF3737";
        config.palette.sbColorPositive = "#4EFFB4";
        config.palette.sbColorWarning = "#FFCE5C";
        config.palette.sbColorSecondary = "#FFEDEE";
        config.palette.sbColorSecondaryDisabled = "#F5F5F5";
        config.palette.sbColorOnPrimary = "#FFFFFF";
        config.palette.sbColorOnSecondary = "#C8193C";
        config.palette.sbColorSurface = "#FFFFFF";
        config.palette.sbColorOutline = "#EFEFEF";
        config.palette.sbColorOnSurfaceVariant = "#707070";
        config.palette.sbColorOnSurface = "#000000";
        config.palette.sbColorSurfaceLow = "#00000026";
        config.palette.sbColorSurfaceHigh = "#0000007A";
        config.palette.sbColorModalOverlay = "#000000A3";
    }


    private setTopBar(config: UIConfig.BarcodeScannerScreenConfiguration) {
        // Set the top bar mode.
        config.topBar.mode = "GRADIENT";
        // Set the background color which will be used as a gradient.
        config.topBar.backgroundColor = "#C8193C";
        // Configure the Cancel button.
        config.topBar.cancelButton.text = "Cancel";
        config.topBar.cancelButton.foreground.color = "#FFFFFF";
    }


    private setActionBar(config: UIConfig.BarcodeScannerScreenConfiguration) {
        config.actionBar.flashButton.visible = true;
        // Configure the inactive state of the flash button.
        config.actionBar.flashButton.backgroundColor = "#0000007A";
        config.actionBar.flashButton.foregroundColor = "#FFFFFF";
        // Configure the active state of the flash button.
        config.actionBar.flashButton.activeBackgroundColor = "#FFCE5C";
        config.actionBar.flashButton.activeForegroundColor = "#000000";
        // Hide/unhide the zoom button.
        config.actionBar.zoomButton.visible = true
        // Configure the inactive state of the zoom button.
        // The zoom button has no active state - it only switches between zoom levels.
        // For configuring those please refer to camera configuring
        config.actionBar.zoomButton.backgroundColor = "#0000007A";
        config.actionBar.zoomButton.foregroundColor = "#FFFFFF";
        // Hide/unhide the flip camera button.
        config.actionBar.flipCameraButton.visible = true
    }

    /**
     * Set User guidance configuration
     * @param config 
     */
    private setUserGuidanceConfig(config: UIConfig.BarcodeScannerScreenConfiguration) {
        // Hide/unhide the user guidance.
        config.userGuidance.visible = true;
        // Configure the title.
        config.userGuidance.title.text = "Cadrez le code-barres";
        config.userGuidance.title.color = "#FFFFFF";
        // Configure the background.
        config.userGuidance.background.fillColor = "#0000007A";
    }

    public async startScanner() {
        // init sdk
        await this.initSdk();
        // configuration
        const config = new UIConfig.BarcodeScannerScreenConfiguration();
        config.scannerConfiguration.barcodeFormats = ['CODE_128'];
        this.setSignalScanUseCase(config);
        this.setPaletteConfig(config);
        this.setUserGuidanceConfig(config);
        this.setTopBar(config);
        this.setActionBar(config);
        // Ready-to-use UI
        const result = ScanbotSDK.UI.createBarcodeScanner(config);
        return result;
    }
}