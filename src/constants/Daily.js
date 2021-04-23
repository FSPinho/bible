import DateFormat from 'dateformat'
import {DAILY_IMAGES, DAILY} from './DailyRaw'

const _getImageAt = i =>
    DAILY_IMAGES[i % DAILY_IMAGES.length]

const _getDailyAt = i =>
    DAILY[i % DAILY.length]

export default {
    getTodaySDaily: (offset = 8) => {
        const daily = []
        const day = parseInt(+new Date() / (1000 * 60 * 60 * 24))

        for (let i = day; i > day - offset; i--) {
            if (i >= 0) {
                const _d = new Date();
                _d.setDate(_d.getDate() - (day - i));
                daily.push({
                    ..._getDailyAt(i),
                    ..._getImageAt(i),
                    schedule: DateFormat(_d, 'yyyy-mm-dd')
                })
            }
        }

        return daily
    }
}
