import { IApplication } from 'types/application';

interface Props {
    applicationList: IApplication[];
}

export default function ApplicationTable({ applicationList }: Props) {
    return (
        <table>
            <thead>
                <tr>
                    <th>apiKey</th>
                    <th>applicationId</th>
                    <th>createAt</th>
                    <th>status</th>
                    <th>type</th>
                </tr>
            </thead>
            <tbody>
                {applicationList.map((app) => (
                    <tr key={app.applicationId}>
                        <td>{app.apiKey || 'N/A'}</td>
                        <td>{app.applicationId}</td>
                        <td>{new Date(app.createdAt).toLocaleString()}</td>
                        {/* <div>{app.session}</div> */}
                        <td>{app.status}</td>
                        <td>{app.type}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
