import sys
import json
from datetime import datetime
from southwest import Reservation
import timezone
import pytz

def get_cron_expression(utc_dt):
    minutes = utc_dt.minute
    hours = utc_dt.hour
    dayOfMonth = utc_dt.day
    month = utc_dt.month
    dayOfWeek = utc_dt.weekday()
    year = utc_dt.year
    toReturn = "cron({} {} {} {} {} {})".format(minutes, hours, dayOfMonth, month, dayOfWeek, year)
    return toReturn

def auto_checkin(reservation_number, first_name, last_name):
    r = Reservation(reservation_number, first_name, last_name)
    # body = r.lookup_existing_reservation()
    # print(body)
    print('Airport Check Begin: ')
    airport_tz = timezone.timezone_for_airport('LAX')
    print('Airport TZ:', airport_tz)

    #Mock reservation time made
    local_dt = datetime.strptime("2023-3-3 10:11:12", "%Y-%m-%d %H:%M:%S")
    print("Local Time", local_dt)
    
    local_dt = airport_tz.localize(local_dt)
    utc_dt = local_dt.astimezone(pytz.utc)
    utc_dt = utc_dt.replace(tzinfo=None)
    print('cron expression', get_cron_expression(local_dt))
    print('UTC time', utc_dt)

    
    
    
    return now
    # for leg in body['bounds']:
    #     # calculate departure for this leg
    #     airport = "{}, {}".format(leg['departureAirport']['name'], leg['departureAirport']['state'])
    #     takeoff = "{} {}".format(leg['departureDate'], leg['departureTime'])
    #     airport_tz = timezone.timezone_for_airport(leg['departureAirport']['code'])
    #     date = airport_tz.localize(datetime.strptime(takeoff, '%Y-%m-%d %H:%M'))
        
    #     if date > now:
    #         # found a flight for checkin!
    #         print("Flight information found, departing {} at {}".format(airport, date.strftime('%b %d %I:%M%p')))
    #         # Checkin with a thread
    #         t = Thread(target=schedule_checkin, args=(date, r))
    #         t.daemon = True
    #         t.start()
    #         threads.append(t)

    
    
 
if __name__ == '__main__':

    data = json.loads(sys.argv[1])
    confNumber = data['confNumber']
    firstName = data['firstName']
    lastName = data['lastName']
    try:
        now = datetime.now()
        time_of_attempt = now.strftime("%H:%M:%S")

        # print("Attempting to check in {} {} at {}. Confirmation: {}\n".format(firstName, lastName, time_of_attempt, confNumber))
        auto_checkin(confNumber, firstName, lastName)
        
    except KeyboardInterrupt:
        print("Ctrl+C detected, canceling checkin")
        sys.exit()


# print("hey its python", flush=True)

