import moment from 'moment'
export function getLastUpdates(time) {
    return moment(time).fromNow()
}
