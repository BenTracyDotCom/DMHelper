import { createSlice } from '@reduxjs/toolkit';
import sampleCampaign from '../../../../utilities/sampleCampaign'

const campaignsSlice = createSlice({
    name: 'campaigns',
    initialState: {
        campaigns: [sampleCampaign]
    },
    reducers: {
        campaignAdded(state, action) {
            state.campaigns.push({
                id: action.payload.id,
                campaign: action.payload.campaign
            })
        },
        campaignEdited(state, action) {
            state.campaigns = state.campaigns.filter(campaign => (campaign.id !== action.payload.id))
            state.campaigns.push({
                id: action.payload.id,
                campaign: action.payload.campign
            })
        },
        campaignDeleted(state, action) {
            state.campaigns = state.campaigns.filter(campaign => (campaign.id !== action.payload.id))
        }
    }
})

export const { campaignAdded, campaignEdited, campaignDeleted } = campaignsSlice.actions
export default campaignsSlice.reducer