async function analyzeSentimentsOfText(text) {
    const language = require('@google-cloud/language');
    const client = new language.LanguageServiceClient();
    const document = {
        content: text,
        type: 'PLAIN_TEXT',
    };
    const [result] = await client.analyzeSentiment({document});
    return result;
}

exports.getSentiments = async(req, res) => {
    const result = await analyzeSentimentsOfText("this country sucks");
    res.json(result);
};