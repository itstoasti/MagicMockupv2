import React from "react";
import {styles} from "./styles";
import {getBrowserExtensionInfo} from "../../../utils/misc";

export const BrowserExtensionBanner = () => {
    const extensionInfo = getBrowserExtensionInfo();
    if (!extensionInfo) {
        return null;
    }

    const {link, name} = extensionInfo;

    return (
        <div className={styles()} style={{padding: '15px 0', marginBottom: '20px', zIndex: 1000}}>
            <span role="img" aria-label="rocket">🚀</span> Try our <a target="_blank" rel="noopener noreferrer" href={link}><span>{name}</span></a> for one-click
            screenshot mockups from any page
        </div>
    );
}