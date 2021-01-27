import { useTracking } from '../contexts/trackers' 

function Form(props) {
    const { logEvent } = useTracking()
    return <form onSubmit={() => {
            // code that does something to submit data
            logEvent({
                category: 'ExampleCategory',
                action: 'Submitted Data',
                label: 'Special Label'
                })
        }}>
            <button type="submit">Submit</button>
        </form>
}