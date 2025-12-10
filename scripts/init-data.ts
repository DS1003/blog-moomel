import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Initialisation des données...');

    // Création des catégories
    await prisma.category.createMany({
        data: [
            { name: "Skincare", slug: "skincare", description: "Tout pour une belle peau" },
            { name: "Maquillage", slug: "maquillage", description: "Astuces et tutoriels makeup" },
            { name: "Cheveux", slug: "cheveux", description: "Soins capillaires et coiffures" },
            { name: "Bien-être", slug: "bien-etre", description: "Santé et relaxation" },
        ],
        skipDuplicates: true,
    });
    console.log('Catégories créées.');

    // Création des tags
    await prisma.tag.createMany({
        data: [
            { name: "Routine", slug: "routine" },
            { name: "Été", slug: "ete" },
            { name: "Tendance 2025", slug: "tendance-2025" },
            { name: "Anti-âge", slug: "anti-age" },
            { name: "Hydratation", slug: "hydratation" },
        ],
        skipDuplicates: true,
    });
    console.log('Tags créés.');

    // Création d'un utilisateur admin par défaut pour l'article
    const adminUser = await prisma.user.upsert({
        where: { email: "admin@moomel.com" },
        update: {},
        create: {
            email: "admin@moomel.com",
            name: "Moomel Admin",
            role: "ADMIN",
            image: "https://github.com/shadcn.png" // Placeholder
        }
    });
    console.log('Utilisateur Admin assuré.');

    // Récupération de la catégorie Skincare pour l'article
    const skincareCategory = await prisma.category.findUnique({
        where: { slug: "skincare" }
    });

    if (skincareCategory) {
        // Création de l'article avec le texte structuré
        await prisma.article.upsert({
            where: { slug: "retour-aux-sources-beaute-naturelle" },
            update: {
                content: `
<p>L’éclat naturel de la peau peut être altéré au fil du temps par des facteurs externes tels que la pollution, les changements climatiques ou encore les rayons UV. En effet, étant constamment exposée, la peau du visage subit ces agressions qui provoquent des signes de fatigue, de vieillissement prématuré ou encore de l'acné. Une routine de soins naturels peut être le moyen idéal pour obtenir une belle, saine et rayonnante peau, que vous cherchiez à prendre soin de vous grâce aux bienfaits de la nature, à soigner les irritations cutanées, ou à adopter un mode de vie plus respectueux de l'environnement.</p>

<h2>Qu'est ce qu’une routine naturelle?</h2>
<p>Les soins naturels impliquent l'utilisation de produits fabriqués à partir d'ingrédients d'origine végétale et d'autres composants d'origine naturelle, tels que les huiles, les beurres, les herbes et les minéraux. Ces produits ont de nombreux bienfaits, ils aident à hydrater et nourrir en profondeur la peau, à protéger et préserver la barrière cutanée naturelle et à prévenir les signes de vieillissement prématuré. En résumé, ils visent à régénérer la peau grâce à des ingrédients naturels utilisés depuis des siècles dans différentes cultures.</p>

<h2>L’essor des soins naturels de la peau</h2>
<p>Le secteur des produits de beauté naturels a connu une croissance remarquable au cours de la dernière décennie, stimulée par la demande croissante des consommateurs pour des produits sans substances chimiques, d'une prise de conscience accrue en matière de santé et de développement durable, ainsi que d'une sensibilisation croissante aux potentiels effets néfastes des ingrédients synthétiques.</p>
<p>Cette popularité n'est pas seulement une tendance passagère, mais le signe d'un changement profond dans les habitudes des consommateurs. Alors que nous prenons de plus en plus conscience des conséquences négatives des produits chimiques sur la peau, notamment le teint terne et les inflammations, de plus en plus de personnes se tournent vers les soins naturels à la recherche d'alternatives plus douces pour leur peau et en accord avec leurs valeurs. De nombreuses personnes souffrant d'eczéma, de rosacée ou d'acné trouvent un soulagement en optant pour des produits naturels. En effet, la peau absorbe la plupart des substances qui y sont appliquées, ce qui signifie que les ingrédients ont leur importance.</p>

<h2>Pourquoi choisir des soins naturels de la peau ?</h2>

<h3>Moins de produits chimiques</h3>
<p>De nombreux produits de soin conventionnels contiennent des produits chimiques synthétiques, des parabènes, des sulfates et des parfums artificiels. Les produits de soins naturels, en revanche, sont généralement exempts de ces substances chimiques nocives. Ils sont riches en ingrédients actifs, agissent pour apaiser, soigner et hydrater, offrant une approche plus douce et plus nourrissante des soins de la peau.</p>

<h3>Efficacité des ingrédients naturels</h3>
<p>De nombreux ingrédients naturels possèdent des propriétés anti-inflammatoires, antioxydantes et antimicrobiennes qui aident à rétablir l'équilibre naturel de la peau. L'objectif est de nourrir votre peau de manière à soutenir ses processus naturels de guérison, plutôt que de recourir à des produits chimiques agressifs pour traiter les problèmes cutanés. Les soins naturels ont une approche holistique, ils ne se limitent pas à traiter la surface de la peau, mais aussi son bien-être global.</p>

<h3>Une meilleure santé cutanée à long terme</h3>
<p>Si les ingrédients cosmétiques synthétiques peuvent offrir des résultats rapides, ils nuisent souvent à la santé de la peau à long terme. En revanche, les formules naturelles visent à réparer, protéger et renforcer la barrière cutanée.</p>
<p>Les ingrédients naturels sont reconnus pour :</p>
<ul>
  <li>Réduire l'inflammation</li>
  <li>Combattre le stress oxydatif</li>
  <li>Favoriser la production de collagène</li>
  <li>Améliorer la régénération cellulaire</li>
</ul>
<p>Adopter une approche à long terme en matière de soins naturels peut aider votre peau à vieillir en beauté et à conserver son éclat naturel.</p>

<h3>Transparence et authenticité</h3>
<p>Le marché des soins naturels propose des produits avec des ingrédients bruts, non transformés. Les marques mettent en avant des listes d'ingrédients claires, des méthodes de fabrication simples, ainsi qu’une transparence sur l’origine et la composition des produits. Elles promeuvent une beauté authentique et naturelle, avec des soins purs, simples et efficaces.</p>

<h3>Respect de l’environnement</h3>
<p>Les cosmétiques naturels, privilégient des ingrédients issus de l'agriculture biologique et des processus de fabrication plus écologiques. Ainsi adopter une routine avec des produits à base d’ingrédients naturels, c’est profiter de leurs nombreux bienfaits sur la peau, sans compromettre notre santé ni l'environnement.</p>

<h3>Valorisation du terroir</h3>
<p>Le mouvement vers le naturel contribue à dynamiser les économies locales, à encourager la production éthique et les marques qui s’alignent sur ces valeurs, à préserver les savoir-faire locaux et l'artisanat.</p>

<p>Savoir exactement ce que vous appliquez sur votre peau renforce votre confiance et vous permet de faire de meilleurs choix pour votre corps et vos valeurs. Opter pour le naturel, c'est choisir des produits qui nourrissent plutôt que de masquer, qui soignent plutôt que de nuire. La beauté naturelle, c'est prendre soin de soi de la manière la plus pure qui soit.</p>
                `
            },
            create: {
                title: "Retour aux sources de la beauté : la transition vers les soins naturels pour la peau",
                slug: "retour-aux-sources-beaute-naturelle",
                excerpt: "Découvrez pourquoi et comment adopter une routine de soins naturels pour une peau saine et rayonnante.",
                content: `
<p>L’éclat naturel de la peau peut être altéré au fil du temps par des facteurs externes tels que la pollution, les changements climatiques ou encore les rayons UV. En effet, étant constamment exposée, la peau du visage subit ces agressions qui provoquent des signes de fatigue, de vieillissement prématuré ou encore de l'acné. Une routine de soins naturels peut être le moyen idéal pour obtenir une belle, saine et rayonnante peau, que vous cherchiez à prendre soin de vous grâce aux bienfaits de la nature, à soigner les irritations cutanées, ou à adopter un mode de vie plus respectueux de l'environnement.</p>

<h2>Qu'est ce qu’une routine naturelle?</h2>
<p>Les soins naturels impliquent l'utilisation de produits fabriqués à partir d'ingrédients d'origine végétale et d'autres composants d'origine naturelle, tels que les huiles, les beurres, les herbes et les minéraux. Ces produits ont de nombreux bienfaits, ils aident à hydrater et nourrir en profondeur la peau, à protéger et préserver la barrière cutanée naturelle et à prévenir les signes de vieillissement prématuré. En résumé, ils visent à régénérer la peau grâce à des ingrédients naturels utilisés depuis des siècles dans différentes cultures.</p>

<h2>L’essor des soins naturels de la peau</h2>
<p>Le secteur des produits de beauté naturels a connu une croissance remarquable au cours de la dernière décennie, stimulée par la demande croissante des consommateurs pour des produits sans substances chimiques, d'une prise de conscience accrue en matière de santé et de développement durable, ainsi que d'une sensibilisation croissante aux potentiels effets néfastes des ingrédients synthétiques.</p>
<p>Cette popularité n'est pas seulement une tendance passagère, mais le signe d'un changement profond dans les habitudes des consommateurs. Alors que nous prenons de plus en plus conscience des conséquences négatives des produits chimiques sur la peau, notamment le teint terne et les inflammations, de plus en plus de personnes se tournent vers les soins naturels à la recherche d'alternatives plus douces pour leur peau et en accord avec leurs valeurs. De nombreuses personnes souffrant d'eczéma, de rosacée ou d'acné trouvent un soulagement en optant pour des produits naturels. En effet, la peau absorbe la plupart des substances qui y sont appliquées, ce qui signifie que les ingrédients ont leur importance.</p>

<h2>Pourquoi choisir des soins naturels de la peau ?</h2>

<h3>Moins de produits chimiques</h3>
<p>De nombreux produits de soin conventionnels contiennent des produits chimiques synthétiques, des parabènes, des sulfates et des parfums artificiels. Les produits de soins naturels, en revanche, sont généralement exempts de ces substances chimiques nocives. Ils sont riches en ingrédients actifs, agissent pour apaiser, soigner et hydrater, offrant une approche plus douce et plus nourrissante des soins de la peau.</p>

<h3>Efficacité des ingrédients naturels</h3>
<p>De nombreux ingrédients naturels possèdent des propriétés anti-inflammatoires, antioxydantes et antimicrobiennes qui aident à rétablir l'équilibre naturel de la peau. L'objectif est de nourrir votre peau de manière à soutenir ses processus naturels de guérison, plutôt que de recourir à des produits chimiques agressifs pour traiter les problèmes cutanés. Les soins naturels ont une approche holistique, ils ne se limitent pas à traiter la surface de la peau, mais aussi son bien-être global.</p>

<h3>Une meilleure santé cutanée à long terme</h3>
<p>Si les ingrédients cosmétiques synthétiques peuvent offrir des résultats rapides, ils nuisent souvent à la santé de la peau à long terme. En revanche, les formules naturelles visent à réparer, protéger et renforcer la barrière cutanée.</p>
<p>Les ingrédients naturels sont reconnus pour :</p>
<ul>
  <li>Réduire l'inflammation</li>
  <li>Combattre le stress oxydatif</li>
  <li>Favoriser la production de collagène</li>
  <li>Améliorer la régénération cellulaire</li>
</ul>
<p>Adopter une approche à long terme en matière de soins naturels peut aider votre peau à vieillir en beauté et à conserver son éclat naturel.</p>

<h3>Transparence et authenticité</h3>
<p>Le marché des soins naturels propose des produits avec des ingrédients bruts, non transformés. Les marques mettent en avant des listes d'ingrédients claires, des méthodes de fabrication simples, ainsi qu’une transparence sur l’origine et la composition des produits. Elles promeuvent une beauté authentique et naturelle, avec des soins purs, simples et efficaces.</p>

<h3>Respect de l’environnement</h3>
<p>Les cosmétiques naturels, privilégient des ingrédients issus de l'agriculture biologique et des processus de fabrication plus écologiques. Ainsi adopter une routine avec des produits à base d’ingrédients naturels, c’est profiter de leurs nombreux bienfaits sur la peau, sans compromettre notre santé ni l'environnement.</p>

<h3>Valorisation du terroir</h3>
<p>Le mouvement vers le naturel contribue à dynamiser les économies locales, à encourager la production éthique et les marques qui s’alignent sur ces valeurs, à préserver les savoir-faire locaux et l'artisanat.</p>

<p>Savoir exactement ce que vous appliquez sur votre peau renforce votre confiance et vous permet de faire de meilleurs choix pour votre corps et vos valeurs. Opter pour le naturel, c'est choisir des produits qui nourrissent plutôt que de masquer, qui soignent plutôt que de nuire. La beauté naturelle, c'est prendre soin de soi de la manière la plus pure qui soit.</p>
                `,
                published: true,
                featured: true,
                authorId: adminUser.id,
                categoryId: skincareCategory.id
            }
        });
        console.log('Article "Retour aux sources" créé/mis à jour.');
    }

    console.log('Terminé !');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
