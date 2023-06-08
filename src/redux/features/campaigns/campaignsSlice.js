import { createSlice } from '@reduxjs/toolkit';

// Sample data for testing:
import sampleCampaign from '../../../../utilities/sampleCampaign'

const campaignsSlice = createSlice({
    name: 'campaigns',
    initialState: [ sampleCampaign ],
    reducers: {
        campaignAdded(state, action) {
            state.push({
                id: action.payload.id,
                campaign: action.payload.campaign
            })
        },
        campaignEdited(state, action) {
            state = state.filter(campaign => (campaign.id !== action.payload.id))
            state.push({
                id: action.payload.id,
                campaign: action.payload.campign
            })
        },
        campaignDeleted(state, action) {
            state = state.filter(campaign => (campaign.id !== action.payload.id))
        }
    }
})

export const { campaignAdded, campaignEdited, campaignDeleted } = campaignsSlice.actions
export default campaignsSlice.reducer