const express = require('express')
const db = require('./db')
const app = express()

// We can add global pipe to check auth

function distance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 +
            c(lat1 * p) * c(lat2 * p) *
            (1 - c((lon2 - lon1) * p))/2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

function collectNearUsers(range, lat, lng, locations) {
    const result = [];

    for (var i = 0; i < locations.length; i++) {
        var loc = locations[i];
        var d = distance(lat, lng, loc.lat, loc.lng);
        if (d < range) {
            result.push(loc)
        }
    }

    return result;
}

app.use(express.json())

app.post('/findusers', async (req, res) => {
    const { radius, userId } = req.body.input
    const users = await db`SELECT * FROM "user"`
    const mappedUser = users.reduce((a, b) => ({ ...a, [b['id']]: b }), {})
    const tracks = await db`SELECT * FROM "user_tracking"`
    const userTrack = tracks.find(track => track['user_id'] === userId)
    const nearUsers = collectNearUsers(radius, userTrack.lat, userTrack.lng, tracks)
    const result = nearUsers.map(track => ({
        firstName: mappedUser[track['user_id']]?.['first_name'],
        lastName: mappedUser[track['user_id']]?.['last_name'],
        gender: mappedUser[track['user_id']]?.['gender'],
        location: {
            lat: track.lat,
            lng: track.lng
        }
    }))
    res.status(200).json(result)
})

app.listen(process.env.PORT || 4444, () => {
    console.log('Started....')
})