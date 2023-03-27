from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.schedulers.blocking import BlockingScheduler

from send_email import send_mail
from datetime import datetime , date
import datetime as dt
import time




def email_send():
    send_mail(subject="Test",
        reciver_email=['test1@karunya.edu.in','test2@gmail.com',]
        )
    
class Scheduler:
    def __init__(self, year, month, day, hour, minute, second):
        self.sched = BlockingScheduler()
        self.year = year
        self.month = month
        self.day = day
        self.hour = hour
        self.minute = minute
        self.second = second
    
    def create_scheduler(self):
        send_time = dt.datetime(self.year,self.month,self.day,self.hour,self.minute,self.second) # set your sending time in UTC
        snd = time.sleep(send_time.timestamp() - time.time())
        self.sched.add_job(email_send,'date', snd)
        try :
            self.sched.start()
        except (KeyboardInterrupt, SystemExit):
            pass
    
    
    # def modify_scheduler():


year =int(input("Enter the year :"))
month = int(input("Enter the month :"))
day = int(input("Enter the Date:"))
hour = int(input("Enter the Hour :"))
minute = int(input("Enter the minutes :"))
second = int(input("Enter the seconds :"))

s = Scheduler(year, month, day, hour, minute, second)
s.create_scheduler()
