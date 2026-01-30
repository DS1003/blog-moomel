import { Metadata } from 'next';
import MentionsLegalesView from './MentionsLegalesView';

export const metadata: Metadata = {
    title: 'Mentions Légales | Moomel',
    description: 'Informations légales concernant l’éditeur du site Moomel, l’hébergement, la propriété intellectuelle et la protection des données.',
};

export default function MentionsLegalesPage() {
    return <MentionsLegalesView />;
}
