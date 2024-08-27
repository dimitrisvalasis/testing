const Alexa = require('ask-sdk-core');

// Replace with your radio station's streaming URL
const RADIO_STREAM_URL = 'https://radio.1055rock.gr:31056/live';

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Welcome to GitHub Radio. Playing your favorite station now.';
        
        return handlerInput.responseBuilder
            .speak(speechText)
            .addAudioPlayerPlayDirective('REPLACE_ALL', RADIO_STREAM_URL, 'radioToken', 0, null)
            .getResponse();
    }
};

const PlayRadioIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
               Alexa.getIntentName(handlerInput.requestEnvelope) === 'PlayRadioIntent';
    },
    handle(handlerInput) {
        const speechText = 'Playing your favorite radio station.';
        
        return handlerInput.responseBuilder
            .speak(speechText)
            .addAudioPlayerPlayDirective('REPLACE_ALL', RADIO_STREAM_URL, 'radioToken', 0, null)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
               Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'You can say play the radio, or you can say stop to end the stream.';
        
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
               (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent' ||
                Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Stopping the radio. Goodbye!';
        
        return handlerInput.responseBuilder
            .speak(speechText)
            .addAudioPlayerStopDirective()
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
        return handlerInput.responseBuilder.getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
        const speechText = 'Sorry, I had trouble doing what you asked. Please try again.';
        
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        PlayRadioIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();
