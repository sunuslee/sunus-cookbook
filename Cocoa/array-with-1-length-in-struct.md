Given Struct:

```

struct kern_event_msg {
	u_int32_t	total_size;	/* Size of entire event msg */
	u_int32_t	vendor_code;	/* For non-Apple extensibility */
	u_int32_t	kev_class;	/* Layer of event source */
	u_int32_t	kev_subclass;	/* Component within layer */
	u_int32_t	id;		/* Monotonically increasing value */
	u_int32_t	event_code;	/* unique code */
	u_int32_t	event_data[1];	/* One or more data words */
};


struct kev_in_data {
	struct net_event_data   link_data;
	struct in_addr  ia_addr;
	u_long	ia_net;			/* network number of interface */
	u_long	ia_netmask;		/* mask of net part */
	u_long	ia_subnet;		/* subnet number, including net */
	u_long	ia_subnetmask;		/* mask of subnet part */
	struct	in_addr ia_netbroadcast; /* to recognize net broadcasts */
	struct  in_addr ia_dstaddr;
};
```

event_data[1] is a pointer to a variable-length data, e.g, a __struct kev_in_data__

the code below shows how to fetch __struct kev_in_data__ from __event_data__ in __kern_event_msg__


```
 	 const size_t eventMinimumSize = (KEV_MSG_HEADER_SIZE + sizeof (struct kev_in_data));
    char eventMsgBuffer[eventMinimumSize];
    bzero(eventMsgBuffer, eventMinimumSize);
    
    ssize_t bytesReceived = -1;
    struct kern_event_msg *eventMsg = NULL;
    struct kev_in_data *eventData = NULL;
    size_t eventDataSize = 0;
    
    bytesReceived = recv(onSocket, eventMsgBuffer, eventMinimumSize, 0);
    if(bytesReceived < 0)
    {
        /* Error - ignore. */
        goto next_event;
    }
    if ((size_t)bytesReceived < eventMinimumSize)
    {
        /* Short read - ignore. */
        goto next_event;
    }
    eventMsg = (struct kern_event_msg *)eventMsgBuffer;
    eventDataSize = eventMsg->total_size - KEV_MSG_HEADER_SIZE;
    if(eventDataSize != sizeof(struct kev_in_data))
    {
        /* Length of the message is bogus. */
        goto next_event;
    }
    eventData = (struct kev_in_data *)&eventMsg->event_data[0];
```
