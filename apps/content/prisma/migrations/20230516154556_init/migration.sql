-- CreateTable
CREATE TABLE "ConsultationResult" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "question_id" STRING NOT NULL,
    "data" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "author_id" STRING NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ConsultationResult_id_key" ON "ConsultationResult"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ConsultationResult_question_id_key" ON "ConsultationResult"("question_id");
