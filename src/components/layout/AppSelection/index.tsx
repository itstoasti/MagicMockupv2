import React, {useState, useEffect} from "react";
import {view} from "@risingstack/react-easy-state";
import {FeatureSelector} from "../../common/FeatureSelector";
import {Routes, routeStore} from "../../../stores/routeStore";
import {app} from "../../../stores/appStore";
import {textStore} from "../../../stores/textStore";
import {imageStore} from "../../../stores/imageStore";

export const AppSelection = view(() => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Always show the selection modal when this component mounts
        setIsModalOpen(true);
    }, []);

    const handleSelectMockup = () => {
        setIsModalOpen(false);
        // Clear any existing image/video data and overlays when selecting a new tool
        app.resetImage();
        textStore.clearAllText();
        imageStore.clearAllImages();
        routeStore.goToRoute(Routes.MockupApp);
    };

    const handleSelectTextBehindImage = () => {
        setIsModalOpen(false);
        // Clear any existing image/video data and overlays when selecting a new tool
        app.resetImage();
        textStore.clearAllText();
        imageStore.clearAllImages();
        routeStore.goToRoute(Routes.TextBehindImageApp);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        // Redirect back to home if they close the modal
        routeStore.goToRoute(Routes.Home);
    };

    return (
        <FeatureSelector
            isOpen={isModalOpen}
            onClose={handleClose}
            onSelectMockup={handleSelectMockup}
            onSelectTextBehindImage={handleSelectTextBehindImage}
        />
    );
});