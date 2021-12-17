const axios = require('axios');
const Voice = require('../models/Voice.js');
const { Router } = require('express');

const apiRouter = Router();


// /api/v1/voices/update
apiRouter.get('/voices/update', async (req, res) => {
    try {
        const voicesList = await axios(process.env.VOICES_LIST_URI);

        const promises = voicesList.data.map(async el => {
            const filter = { id: el.id }
            const update = {
                language: el.language,
                providerLanguage: el.providerLanguage,
                name: el.name,
                sex: el.sex,
                provider: el.provider,
                flags: el.flags
            }

            const updated = await Voice.findOneAndUpdate(filter, update, {
                upsert: true
            }).exec();
        });

        await Promise.all(promises);

        res.status(200).json({ message: 'Список обновлен' });
    } catch (e) {
        res.status(500).json({ message: 'Ошибка сервера' })
    }
});

// /api/v1/voices/list
apiRouter.get('/voices/list', async (req, res) => {
    try {
        const voiceFilter = {};
        const { lang } = req.query;

        if (lang) {
            voiceFilter.language = lang;
        }

        Voice.find(voiceFilter, (err, voices) => {
            res.status(200).json(voices);
        });
    } catch (e) {
        res.status(500).json({ message: 'Ошибка сервера' })
    }
});

// /api/v1/voices/languages
apiRouter.get('/voices/languages', async (req, res) => {
    try {
        Voice.distinct('language', (err, languages) => {
            res.status(200).json(languages);
        });
    } catch (e) {
        res.status(500).json({ message: 'Ошибка сервера' })
    }
});

module.exports = apiRouter;