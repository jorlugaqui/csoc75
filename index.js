// Sentiment API Setup
const language = require('@google-cloud/language');
const client = new language.LanguageServiceClient();

async function analyzeSentimentsOfText(text) {
    // Prepare the expected API's payload
    const document = {
        content: text,
        type: 'PLAIN_TEXT',
    };

    // Hit the API
    try {
        const [result] = await client.analyzeSentiment({document});
        const sentiments = result.documentSentiment || {};
        return sentiments;
    } catch (error) {
        console.error(`Failed to analyze ${text}.`, error);
        throw error;
    }
}

exports.getSentiments = async(req, res) => {
    const text = req.query.text || null;
    console.info(`Calling API with text=${text}`);
    if (!text) {
        const errorMessage = 'Query parameter text was not provided';
        console.warn(errorMessage);
        res.status(400).json({"message": errorMessage});
    }
    try{
        const result = await analyzeSentimentsOfText(text);
        res.json(result);
    } catch (error) {
        res.status(500).json(
            {"message": "Ups, that's an internal error!, please try again in a few minutes"}
        );
    }
};