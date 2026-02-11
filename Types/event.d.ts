type ProductOrder = {
    id: number,
    quantity: number
}
type EventData = {
    event_name: string,
    event_time: number,
    user_data: {
        ph?: string[],
        fn?: string[],
        ct?: string[],
        st?: string[],
        ln?: string[],
        fbc: string,
        fbp: string
    },
    custom_data?: {
        currency?: string,
        value?: number,
        content_type?: string,
        contents?: ProductOrder[],
        content_ids?: number[] | string[]
    },
    event_source_url?: string,
    action_source?: string
}
interface EventFacebook {
    data: EventData[]
}


interface EventTiktok {
    eventType: string,
    userData: {
        email?: string,
        phone?: string,
        ttclid?: string,
        _ttp: string,
        external_id?: string,
    },
    eventData: {
        event_id?: string,
        event_time?: number,
        event_source_url?: string,
        ip?: string,
        user_agent?: string,
        currency?: string,
        value?: number,
        order_id?: string,
        content_type?: string,
        contents: {
            id: string,
            quantity: number,
            price: number
        }[]
    }
}

