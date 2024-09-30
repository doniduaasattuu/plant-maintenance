<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Finding extends Model
{
    use HasFactory;

    protected $table = 'findings';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'id',
        'finding_status_id',
        'equipment_id',
        'functional_location_id',
        'description',
        'notification',
        'attachment_before',
        'attachment_after',
        'reported_by',
        'closed_by',
        'created_at',
        'updated_at',
    ];
}
