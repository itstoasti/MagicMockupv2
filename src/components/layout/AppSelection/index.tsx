import React, {useState, useEffect} from "react";
import {view} from "@risingstack/react-easy-state";
import {FeatureSelector} from "../../common/FeatureSelector";
import {Routes, routeStore} from "../../../stores/routeStore";
import {app} from "../../../stores/appStore";

export const AppSelection = view(() => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // If there's already image data, redirect to MockupApp automatically
        if (app.imageData || app.videoData) {
            routeStore.goToRoute(Routes.MockupApp);
            return;
        }
        // Otherwise, show the selection modal
        setIsModalOpen(true);
    }, []);

    const handleSelectMockup = () => {
        setIsModalOpen(false);
        routeStore.goToRoute(Routes.MockupApp);
    };

    const handleSelectTextBehindImage = () => {
        setIsModalOpen(false);
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