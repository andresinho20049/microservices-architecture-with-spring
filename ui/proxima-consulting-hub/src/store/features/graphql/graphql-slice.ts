import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import graphqlApi from "./graphql-api";
import { GraphQlRequestType, Mutation, Query } from "./graphql-types";

type initialStateType = {
    reqState: {[key:string]:GraphQlRequestType};
    query: Query;
    mutation: Mutation;
}

const initialState: initialStateType = {
    reqState: {} as {[key:string]:GraphQlRequestType},
    query: {} as Query,
    mutation: {} as Mutation
}

export const graphqlSlice = createSlice({
    name: "graphql",
    initialState: initialState,
    reducers: {
        resetReqState: (state) => {
            state.reqState = {} as {[key:string]:GraphQlRequestType};
        },
        setReqState: (state, {payload}: {payload: {key: string, content: GraphQlRequestType} }) => {
            state.reqState = {...state.reqState, [payload.key]: payload.content };
        },
        setEnableReqState: (state, {payload}: {payload: {key: string, content: boolean}}) => {
            state.reqState = { ...state.reqState, [payload.key]: { ...state.reqState[payload.key], enable: payload.content }};
        },
        setParamReqState: (state, {payload}: {payload: {key: string, content: {[key: string]: any}} }) => {
            state.reqState = { ...state.reqState, [payload.key]: { ...state.reqState[payload.key], parameters: payload.content }};
        },
        setResultReqState: (state, {payload}: {payload: {key: string, content: {[key: string]: any}} }) => {
            state.reqState = { ...state.reqState, [payload.key]: { ...state.reqState[payload.key], result: payload.content }};
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<initialStateType>) => { 
        builder
        .addMatcher(graphqlApi.endpoints.graphQL.matchFulfilled, (state, {payload:DataRTKQueryResponseType}) => {
            const {data} = DataRTKQueryResponseType;
            if(!!data) {
                if(!!data?.companyById) {
                    state.query.companyById = data.companyById;
                }
                if(!!data?.employeeByCompanyId) {
                    state.query.employeeByCompanyId = data.employeeByCompanyId;
                }
                if(!!data?.projectByCompanyId) {
                    state.query.projectByCompanyId = data.projectByCompanyId;
                }
                if(!!data?.positionByCompanyId) {
                    state.query.positionByCompanyId = data.positionByCompanyId;
                }
                if(!!data?.paycheckByCompanyId) {
                    state.query.paycheckByCompanyId = data.paycheckByCompanyId;
                }
                if(!!data?.timesheetByCompanyId) {
                    state.query.timesheetByCompanyId = data.timesheetByCompanyId;
                }
            }
        })
    }
});

export const { setReqState, setParamReqState, setResultReqState, setEnableReqState, resetReqState } = graphqlSlice.actions;
export default graphqlSlice.reducer;