import styled from 'styled-components';

export const SettingsScreenContent = styled.div`
    width: 100%;
`;

export const SettingsGrid = styled.div`
    width: 100%;
    display: grid;
    padding: 1rem;
    grid-template-areas: "backgroundSettings backgroundSettings ."
    "themeSettings themeSettings ."
    "themeSettings themeSettings .";
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(auto, minmax(150px, 1fr));
    gap: 20px;
    align-items: center;

    @media (max-width: 640px) {
        grid-template-columns: minmax(180px, 1fr);
        grid-template-areas: "backgroundSettings"
        "themeSettings";
    }
`;

export const BackgroundSettingsContainer = styled.div`
    grid-area: backgroundSettings;
`;

export const ThemeSettingsContainer = styled.div`
    grid-area: themeSettings;
`;