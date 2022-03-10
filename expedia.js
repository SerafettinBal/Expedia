document.querySelector('#output').textContent = ``;

// compile the template
var template = Handlebars.compile(`


<AvailRateUpdateRQ
	xmlns="http://www.expediaconnect.com/EQC/AR/2011/06">
	<Authentication username={{username}} password={{password}}/>
	<Hotel id={{hotelId}}/>
  {{#each rates}}
	<AvailRateUpdate>
		<DateRange from={{from}} to={{to}} sun={{dow.Sun}} mon={{dow.Mon}} tue={{dow.Tue}} wed={{dow.Weds}} thu={{dow.Thur}} fri={{dow.Fri}} sat={{dow.Sat}}/>
		<RoomType id={{../roomId}} closed="false">

        {{#if ../byAvailableLimit}}
        <Inventory  totalInventoryAvailable={{../roomCount}} />
		{{else}}
        <Inventory flexibleAllocation={{../flexibleAllocation}} />
        {{/if}}	

        <RatePlan id={{id}}  closed={{closed}}  >
				<Rate currency={{../currency}} >
                {{#if occupancyBasedPrices}}
                {{#each occupancyBasedPrices}}
                <PerOccupancy rate={{price}} occupancy={{numberOfGuests}}/>
                {{/each}}
        
                {{else}}	
                <PerDay rate={{defaultPrice}}/> {{/if}}
				</Rate>
                <Restrictions minLOS={{minStay}} maxLOS={{maxStay}} closedToArrival={{cta}} closedToDeparture={{ctd}}/>
			</RatePlan>
		</RoomType>
	</AvailRateUpdate>
	{{/each}}
</AvailRateUpdateRQ>
`);


const params = {
    username: "EQC_Travelaps",
    password:"***",
    hotelId: '419327',
    roomId: '41932704',
    roomCount: '50',
    flexibleAllocation: '20',
    currency: 'EUR',



    rates: [
        {
            from: '2023-03-06',
            to: '2023-03-07',
            dow: {
                Mon: '1',
                Tue: '1',
                Weds: '1',
                Thur: '1',
                Fri: '1',
                Sat: '1',
                Sun: '1',
            },
            id: '20329711',
            defaultPrice: '299.40',
            occupancyBasedPrices: [
                {
                    numberOfGuests: 1,
                    price: 210.0,
                },
                {
                    numberOfGuests: 2,
                    price: 156.0,
                },
                {
                    numberOfGuests: 3,
                    price: 222.0,
                },
            ],
            /* exBed: {
                price: 100.0,
                ageQualifyingCode: "8", //8 10
                maxAge: 15
            }, */
            closed: 0,
            cta: 1,
            ctd: 1,
            minStay: 2,
            maxStay: 7,
        },
        {   from: '2023-03-06',
            to: '2023-03-07',
            dow: {
                Mon: '1',
                Tue: '1',
                Weds: '1',
                Thur: '1',
                Fri: '1',
                Sat: '1',
                Sun: '1',
            },
            id: '20329711',
            defaultPrice: '299.40',
            exBed: {
                price: 100.0,
                ageQualifyingCode: "8", //8 10
                maxAge: 15
            },
            closed: 0,
            minStay: 1,
            maxStay: 4,
        },
        {
            from: '2023-03-06',
            to: '2023-03-07',
            dow: {
                Mon: '1',
                Tue: '1',
                Weds: '1',
                Thur: '1',
                Fri: '1',
                Sat: '1',
                Sun: '1',
            },
            id: '20329711',
            defaultPrice: '218.40',
            occupancyBasedPrices: [
                {
                    numberOfGuests: 1,
                    price: '150.00',
                },
                {
                    numberOfGuests: 2,
                    price: '156.00',
                },
                {
                    numberOfGuests: 3,
                    price: '162.00',
                },
            ],
            closed: 1,
            minStay: 1,
            maxStay: 4,
        },
    ],
};

params.byAvailableLimit = params.roomCount != null;


params.rates.forEach((rate) => {
    rate.sendCta = rate.cta != null;
    rate.cta = rate.cta ? '1' : '0';
    rate.sendCtd = rate.ctd != null;
    rate.ctd = rate.cta ? '1' : '0';
    rate.sendMinStay = rate.minStay != null;
    rate.sendMaxStay = rate.maxStay != null;
    rate.closed = (rate.closed == 1) ? true : false;
    rate.dow.Mon = (rate.dow.Mon == 1) ? true: false;
    rate.dow.Tue = (rate.dow.Tue == 1) ? true: false;
    rate.dow.Weds = (rate.dow.Weds == 1) ? true: false;
    rate.dow.Thur = (rate.dow.Thur == 1) ? true: false;
    rate.dow.Fri = (rate.dow.Fri == 1) ? true: false;
    rate.dow.Sat = (rate.dow.Sat == 1) ? true: false;
    rate.dow.Sun = (rate.dow.Sun == 1) ? true: false;
});

const preparedXML = template(params);

document.querySelector('#output').textContent = preparedXML;