-- AlterTable: add updatedAt to salas
ALTER TABLE "salas" ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable: add updatedAt to reservas
ALTER TABLE "reservas" ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex: unique constraint on salas.nome
CREATE UNIQUE INDEX "salas_nome_key" ON "salas"("nome");

-- CreateIndex: composite index on reservas for conflict queries
CREATE INDEX "reservas_salaId_inicio_fim_idx" ON "reservas"("salaId", "inicio", "fim");
