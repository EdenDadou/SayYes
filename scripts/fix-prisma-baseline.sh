#!/bin/bash

# Script pour résoudre le problème de baseline Prisma P3005
# Ce script marque les migrations existantes comme appliquées pour éviter l'erreur P3005

echo "🔧 Script de correction du baseline Prisma"
echo "=========================================="

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "prisma/schema.prisma" ]; then
    echo "❌ Erreur: prisma/schema.prisma non trouvé. Exécutez ce script depuis la racine du projet."
    exit 1
fi

# Vérifier le statut actuel
echo "📋 Vérification du statut des migrations..."
npx prisma migrate status

echo ""
echo "📋 Marquage des migrations existantes comme appliquées..."

# Parcourir tous les dossiers de migration
for migration_dir in prisma/migrations/*/; do
    if [ -d "$migration_dir" ]; then
        migration_name=$(basename "$migration_dir")
        echo "📋 Marquage de la migration: $migration_name"
        npx prisma migrate resolve --applied "$migration_name"
    fi
done

echo ""
echo "📋 Vérification du nouveau statut..."
npx prisma migrate status

echo ""
echo "📋 Génération du client Prisma..."
npx prisma generate

echo ""
echo "✅ Baseline appliqué avec succès !"
echo "Vous pouvez maintenant utiliser 'npx prisma migrate deploy' sans erreur P3005."
