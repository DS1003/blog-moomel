import { Metadata } from 'next';
import PrivacyView from './PrivacyView';

export const metadata: Metadata = {
    title: 'Politique de Confidentialité | Moomel',
    description: 'Consultez la politique de confidentialité de Moomel pour savoir comment nous protégeons vos données personnelles.',
};

export default function PrivacyPage() {
    return <PrivacyView />;
}
