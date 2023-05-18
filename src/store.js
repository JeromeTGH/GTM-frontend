import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: [],
    reducers: {
        ajouterUtilisateur: (state, action) => {
            // anciennement { type: "ADD_USER", payload: "tata" }
            // { type: user/ajouterUtilisateur, payload: "tata" }
            //      ==> en fait, le nom du type sera égal au nom du slice, slash, le nom de la fonction à exécuter
            const nouvelUtilisateur = {
                id: action.payload.id,
                pseudo: action.payload.pseudo
            }
            state.push(nouvelUtilisateur);
        },
        // modifierUtilisateur: (state, action) => {
        //     // anciennement { type: "MODIFY_USER", payload: 30 "tutu" }
        //     const utilisateur = state.find(util => util.id === action.payload.id);
        //     utilisateur.nom = action.payload.nom;
        // },
        // supprimerUtilisateur: (state, action) => {
        //     // anciennement { type: "DELETE_USER", payload: 12 }
        //     state = state.filter(utilisateur => utilisateur.id !== action.payload);
        // }
    }
});

export const {ajouterUtilisateur} = userSlice.actions

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    }
})
