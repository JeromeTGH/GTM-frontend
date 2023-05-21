import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    // initialState: [{
    //     _id: '',
    //     pseudo: '',
    //     email: '',
    //     estActif: false,
    //     tachespossibles: [],
    //     createdAt: '',
    //     updatedAt: ''
    // }],
    initialState: [],
    reducers: {
        enregistrerInfosUtilisateur: (state, action) => {
            // const utilisateur = state[0];
            // utilisateur._id = action.payload._id;
            // utilisateur.pseudo = action.payload.pseudo;
            // utilisateur.email = action.payload.email;
            // utilisateur.estActif = action.payload.estActif;
            // utilisateur.tachespossibles = action.payload.tachespossibles;
            // utilisateur.createdAt = action.payload.createdAt;
            // utilisateur.updatedAt = action.payload.updatedAt;
            state[0] = action.payload
        },
        // ajouterUtilisateur: (state, action) => {
        //     const nouvelUtilisateur = {
        //         id: action.payload.id,
        //         pseudo: action.payload.pseudo
        //     }
        //     state.push(nouvelUtilisateur);
        // },
        // modifierUtilisateur: (state, action) => {
        //     const utilisateur = state.find(util => util.id === action.payload.id);
        //     utilisateur.nom = action.payload.nom;
        // },
        // supprimerUtilisateur: (state, action) => {
        //     state = state.filter(utilisateur => utilisateur.id !== action.payload);
        // }
    }
});

export const {enregistrerInfosUtilisateur, effacerInfosUtilisateur} = userSlice.actions