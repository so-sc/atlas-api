const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formInputs = {
    SHORT_ANSWER: "short_answer",
    LONG_ANSWER: "long_answer",
    CHECK_BOXES: "check_boxes",
    RADIO_BUTTONS: "radio_buttons",
    NUMBER_INPUT: "number_input",
    DATE_INPUT: "date_input",
    DROPDOWN_INPUT: "dropdown_input"
};

// schema to add additional questions in the event registration form
// name: EventQuestion
const questionSchema = new Schema({
    question: {
        type: String,
        required: true,
        default: 'short_answer'
    },
    question_type: {
        type: String,
        default: formInputs.SHORT_ANSWER
    },
    is_required: {
        type: Boolean,
        required: true,
        default: false
    }
});

// schema to hold answers to the additional form questions
// name: EventAnswer
const answerSchema = new Schema({
    question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EventQuestion',
        required: true
    },
    response: [String]
});

// Schema to record registrations from users
// name: EventRegistrations
const registrationSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rsvp: {
        type: String,
        default: 'none'
    },
    date: {
        type: Date,
        default: Date.now
    },
    answers: [answerSchema]
});

//schema to hold details of the event
//name: Event
const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
        max: 60
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    creator_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    venue: {
        type: String,
        required: true,
        max: 100
    },
    description: {
        type: String,
        required: true,
    },
    seats: {
        type: Number
    },
    entry_type: {
        type: String,
        default: "open"
    },
    cover_image: {
        type: String,
        required: true
    },
    questions: [questionSchema],
    registrations: [registrationSchema]
});

module.exports = {
    event: mongoose.model('Event', eventSchema),
    registration: mongoose.model('EventRegistration', registrationSchema),
    question: mongoose.model('EventQuestion', questionSchema),
    answer: mongoose.model('EventAnswer', answerSchema)
}