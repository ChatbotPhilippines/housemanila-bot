exports.Prompts = {
    BIRTHDAY_REQUEST: 'Awesome! Any special requests?',
    ENTER_MESSAGE: 'Please enter a message for your special request now 🙂',    
    IS_THAT_ALL: 'Sorry, I couldn\'t understand that. When would you like to be reminded to %s? Say something like: "in two weeks, at 9pm tomorrow, or on the 25th."',
    WHAT_ELSE: 'Enter the number that corresponds with your city.',
    COMPANY_NAME: 'What is the name of your company?',
    FULL_NAME: 'What is your full name?',
    CONTACT_NUMBER: 'Please enter your contact number',
    CELEBRATE: 'Are you celebrating anything special? 🙂',
    CONTACT_NUMBER_2: 'Okay. Please enter your contact number now.',
    CONFIRMATION: 'Is this confirmed?',
    ENTER_DATE_TIME: 'When would you like to have the event? Enter the date and time.',
    EVENT: 'Which event would you like to get in the guest list for?',
    ENTER_NAMES: `Please enter the names you would like to add in the guest list (separated by a comma):`,
    ENTER_EMAIL: `Please enter you email address` 

};

exports.Messages = {
    WELCOME: 'Hey I\'m House Manila Bot here to make your partying easier! 🎉🎉🎉 Click the button below to start!',
    OTHERS_REQUEST: `Got it! We'll get back to you about your request if this is possible 🙂`,
    CONFIRMATION_CODE: 'Thank you! A confirmation code will be sent to %i within 24 hours to confirm the reservation 🙂',
    INVALID_EMAIL: 'Invalid e-mail address, please enter your e-mail address',
    THANK_INFO: 'Thank you for the info! Our events officer will contact you within 24 hours for your inquiry.',
    BUY_TICKETS: 'For tickets or table reservations, you may contact +639272204244 🙂',
    GUEST_LIST: 'The following people will be part of the guest list',
    PENDING: 'You are now pending for approval in our guest list! You will receive a message once you get approved. Thank you!',
    EXAMPLE_REMINDERS: [
        'Remind me to go to the gym at 5pm today',
        'Remind me to go for a run tonight at 7pm',
        'Remind me to feed the cat in one hour',
        'Remind me to buy groceries on Saturday at 10:30am',
        'Remind me to take out the garbage tomorrow at 6pm',
        'Remind me to buy movie tickets tomorrow at 6pm',
        'Remind me to go to the team meeting at 4:30pm on Friday'
    ],
    GREETINGS: ['Sup?', 'Hi there!', 'Hello!', 'Hey.'],
    GREETING_RESPONSE: '%s Try something like: %s, or type "help".',
    MULTIPLE_CITIES_FOUND: 'I found a number of cities named %s.',
    REMINDER: 'Hey, you asked me to %s',
    REMINDER_DELETED: 'Reminder deleted.',
    REMINDER_ALREADY_DELETED: 'Oops, looks like that reminder was already deleted.',
    NO_REMINDERS: 'You do not have any active reminders. To create one, say something like: "%s"',
    TIMEZONE_CHANGED: 'Thanks! I have your current time as %s. Now try something like: "%s", or type "help".'
};

// exports.Menus = {
//     help: [
//         { title: 'Show reminders', dialogId: '/showReminders' },
//         { title: 'Show timezone', dialogId: '/showTimezone' },
//         { title: 'Reset timezone', dialogId: '/setTimezone' }
//     ]
// };