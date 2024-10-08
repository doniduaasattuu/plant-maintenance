<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FindingStatus extends Model
{
    use HasFactory;

    protected $table = 'finding_statuses';
    protected $primaryKey = 'id';
    protected $keyType = 'int';

    protected $fillable = [
        'id',
        'keyword',
    ];
}
