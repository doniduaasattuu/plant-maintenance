<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FindingAttachment extends Model
{
    use HasFactory;

    protected $table = 'finding_attachments';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'id',
        'finding_id',
        'type',
        'file_path',
        'created_at',
        'updated_at',
    ];

    public function finding(): BelongsTo
    {
        return $this->belongsTo(Finding::class, 'id', 'finding_id');
    }
}
