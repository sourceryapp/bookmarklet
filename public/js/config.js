export default {
    endpoints: {

        local: {
            name: 'Local',
            description: 'Fake endpoint for quick testing',
            url: 'http://127.0.0.1:3000/api/fake-supabase-edge-function'
        },

        dev: {
            name: 'Dev',
            description: 'Supabase local development endpoint',
            url: 'http://localhost:54321/functions/v1/translate', 
        },

        stage: {
            name: 'Staging',
            description: 'Supabase staging endpoint',
            url: 'https://csfzqcahdlzghhzgbvtq.supabase.co/functions/v1/translate'
        },

        prod: {
            name: 'Production',
            description: 'Supabase production endpoint',
            url: 'https://gvhzhuifsgdcpwmkjboy.supabase.co/functions/v1/translate'
        }
    },
    translation_server: 'https://ts.sourceryapp.org/web',
    sourcery_request_url: 'https://sourceryapp.org/request/create'
}